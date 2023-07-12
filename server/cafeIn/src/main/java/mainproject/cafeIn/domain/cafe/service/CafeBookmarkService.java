package mainproject.cafeIn.domain.cafe.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.cafe.entity.CafeBookmark;
import mainproject.cafeIn.domain.cafe.repository.CafeBookmarkRepository;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CafeBookmarkService {
    private final CafeService cafeService;
    private final MemberService memberService;
    private final CafeBookmarkRepository cafeBookmarkRepository;

    @Transactional
    public void bookmarkCafe(Long cafeId, Long loginId) {
        Cafe cafe = cafeService.findCafeById(cafeId);
        Member member = memberService.findById(loginId);

        Optional<Long> cafeBookmarkId = cafeBookmarkRepository.findCafeBookmarkByCafeIdAndMemberId(cafeId, loginId);
        if (cafeBookmarkId.isPresent()) {
            cafeBookmarkRepository.deleteById(cafeBookmarkId.get());
        } else {
            cafeBookmarkRepository.save(CafeBookmark.of(cafe, member));
        }
    }
}
