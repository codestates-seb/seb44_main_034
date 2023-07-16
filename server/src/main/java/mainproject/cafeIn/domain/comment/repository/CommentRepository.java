package mainproject.cafeIn.domain.comment.repository;

import mainproject.cafeIn.domain.comment.dto.response.CommentResponse;
import mainproject.cafeIn.domain.comment.dto.response.ReplyResponse;
import mainproject.cafeIn.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPostPostId(Long postId);
    List<Comment> findAllByParentCommentId(Long commentId);
}
