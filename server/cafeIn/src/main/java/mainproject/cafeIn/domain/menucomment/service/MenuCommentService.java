package mainproject.cafeIn.domain.menucomment.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.menucomment.entity.MenuComment;
import mainproject.cafeIn.domain.menucomment.repository.MenuCommentRepository;
import mainproject.cafeIn.global.exception.CustomException;
import mainproject.cafeIn.global.exception.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.*;

import static mainproject.cafeIn.global.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MenuCommentService {
    private final MemberService memberService;
    private final MenuService menuService;
    private final MenuCommentRepository menuCommentRepository;

    @Transactional
    public void createMenuComment(Long loginId, Long menuId, MenuComment comment) {
        Member member = memberService.findMemberById(loginId);
        Menu menu = menuService.findMenuById(menuId);
        existMenuComment(loginId, menuId);

        menuCommentRepository.save(MenuComment.of(comment.getContent(), member, menu));
    }

    @Transactional
    public Long updateMenuComment(Long loginId, Long commentId, MenuComment comment) {
        Member member = memberService.findMemberById(loginId);
        MenuComment menuComment = findMenuCommentById(commentId);
        menuComment.update(comment);

        return menuComment.getMenu().getId();
    }

    @Transactional
    public Long deleteMenuComment(Long loginId, Long commentId) {
        Member member = memberService.findMemberById(loginId);
        MenuComment menuComment = findMenuCommentById(commentId);
        Long menuId = menuComment.getMenu().getId();
        menuCommentRepository.delete(menuComment);

        return menuId;
    }

    private MenuComment findMenuCommentById(Long commentId) {
        // TODO: ErrorCode 수정
        return menuCommentRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(INTERNAL_SERVER_ERROR));
    }
    private void existMenuComment(Long memberId, Long menuId) {
        // TODO: ErrorCode 수정
        if (menuCommentRepository.existsMenuCommentByMemberIdAndMenuId(memberId, menuId)) {
            throw new CustomException(INTERNAL_SERVER_ERROR);
        }
    }
}
