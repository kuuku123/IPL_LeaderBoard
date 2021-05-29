package io.javabrains.ipldashboard.model;

import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class League_Match
{
  
  @Id @GeneratedValue
  private Long id;
  private String city;
  private LocalDate date;
  private String playerOfMatch;
  private String venue;
  private String team1;
  private String team2;
  private String tossWinner;
  private String tossDecision;
  private String matchWinner;
  private String result;
  private String resultMargin;
  private String umpire1;
  private String umpire2;


}
