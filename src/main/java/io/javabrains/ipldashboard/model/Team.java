package io.javabrains.ipldashboard.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Team {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String teamName;
  private long totalMatches;
  private long totalWins;

  public Team(String teamName, long totalMatches) {
    this.teamName = teamName;
    this.totalMatches = totalMatches;
  }

  public Team()
  {

  }

  @Override
  public String toString() {
    return "Team [teamName=" + teamName + ", totalMatches=" + totalMatches + ", totalWins="
        + totalWins + "]";
  }



}
