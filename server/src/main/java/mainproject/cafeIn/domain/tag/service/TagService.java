package mainproject.cafeIn.domain.tag.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.tag.dto.TagResponse;
import mainproject.cafeIn.domain.tag.repsitory.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TagService {
    private final TagRepository tagRepository;

    public List<TagResponse> getTags(Long cafeId) {

        return tagRepository.getTags(cafeId);
    }
}
