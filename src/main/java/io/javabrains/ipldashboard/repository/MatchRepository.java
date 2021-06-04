package io.javabrains.ipldashboard.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import io.javabrains.ipldashboard.model.League_Match;

public interface MatchRepository extends JpaRepository<League_Match, Long> {

  List<League_Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2,
      Pageable pageable);

  default List<League_Match> findLatestMatchesByTeam(String teamName, int count) {
    return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, count));
  }

  @Query("select m from League_Match m where (m.team1 = :teamName or  m.team2 = :teamName) and m.date between :dateStart and :dateEnd order by date desc")
  List<League_Match> getMatchesByTeamBetweenDates(@Param("teamName") String teamName,
      @Param("dateStart") LocalDate dateStart, @Param("dateEnd") LocalDate dateEnd);

  // List<League_Match> getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(String
  // teamName1, LocalDate date1 , LocalDate date2,String teamName2,LocalDate date3 , LocalDate
  // date4);

}
