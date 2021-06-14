package io.javabrains.ipldashboard.controller;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import io.javabrains.ipldashboard.model.League_Match;
import io.javabrains.ipldashboard.model.Team;
import io.javabrains.ipldashboard.repository.MatchRepository;
import io.javabrains.ipldashboard.repository.TeamRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class TeamController {

  private final TeamRepository teamRepository;
  private final MatchRepository matchRepository;

  @GetMapping("/team/{teamName}")
  public Team getTeam(@PathVariable String teamName) {

    Team team = teamRepository.findByTeamName(teamName);

    List<League_Match> result = matchRepository.findLatestMatchesByTeam(teamName, 4);

    team.setMatches(result);

    return team;

  }

  @GetMapping("/team")
  public Iterable<Team> getAllTeam() {
    List<Team> result = this.teamRepository.findAll();
    return result;

  }


  @GetMapping("/team/{teamName}/matches")
  public List<League_Match> getMatchesForTeam(@PathVariable String teamName,
      @RequestParam int year) {

        LocalDate startDate = LocalDate.of(year,1,1);
        LocalDate endDate = LocalDate.of(year+1,1,1);
        // return matchRepository.getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(teamName,startDate,endDate, teamName, startDate, endDate);
        return matchRepository.getMatchesByTeamBetweenDates(teamName, startDate, endDate);
  }

}
