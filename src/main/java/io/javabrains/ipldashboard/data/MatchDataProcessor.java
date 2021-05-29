package io.javabrains.ipldashboard.data;

import java.time.LocalDate;

import io.javabrains.ipldashboard.model.League_Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.item.ItemProcessor;

public class MatchDataProcessor implements ItemProcessor<MatchInput, League_Match> {
  private static final Logger log = LoggerFactory.getLogger(MatchDataProcessor.class);

  @Override
  public League_Match process(final MatchInput matchInput) throws Exception {

    League_Match leagueMatch = new League_Match();
    leagueMatch.setId(Long.parseLong(matchInput.getId()));
    leagueMatch.setCity(matchInput.getCity());

    leagueMatch.setDate(LocalDate.parse(matchInput.getDate()));
    leagueMatch.setPlayerOfMatch(matchInput.getPlayer_of_match());
    leagueMatch.setVenue(matchInput.getVenue());

    String firstInningsTeam, secondInningsTeam;

    if ("bat".equals(matchInput.getToss_decision()))
    {
      firstInningsTeam = matchInput.getToss_winner();
      secondInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1()) 
      ? matchInput.getTeam2() : matchInput.getTeam1();
    }
    else
    {
      secondInningsTeam = matchInput.getToss_winner();
      firstInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1()) 
      ? matchInput.getTeam2() : matchInput.getTeam1();
    }

    leagueMatch.setTeam1(firstInningsTeam);
    leagueMatch.setTeam2(secondInningsTeam);

    leagueMatch.setTossWinner(matchInput.getToss_winner());
    leagueMatch.setMatchWinner(matchInput.getWinner());
    leagueMatch.setTossDecision(matchInput.getToss_decision());
    leagueMatch.setResult(matchInput.getResult());
    leagueMatch.setResultMargin(matchInput.getResult_margin());
    leagueMatch.setUmpire1(matchInput.getUmpire1());
    leagueMatch.setUmpire2(matchInput.getUmpire2());

    return leagueMatch;
  }
}
