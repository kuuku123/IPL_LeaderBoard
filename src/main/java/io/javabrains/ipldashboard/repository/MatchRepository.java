package io.javabrains.ipldashboard.repository;

import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import io.javabrains.ipldashboard.model.League_Match;

public interface MatchRepository extends JpaRepository<League_Match, Long> {

  List<League_Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2,Pageable pageable);

  default List<League_Match> findLatestMatchesByTeam(String teamName , int count){
    return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0,count));
  }

}
