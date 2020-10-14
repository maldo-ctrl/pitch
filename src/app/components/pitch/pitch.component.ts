import { Component, OnInit } from "@angular/core";

import { PlayersService } from "src/app/services/players.service";

@Component({
  selector: "app-pitch",
  templateUrl: "./pitch.component.html",
  styleUrls: ["./pitch.component.css"],
})
export class PitchComponent implements OnInit {
  net: any;
  players: any;
  awayLineup: any = [];
  homeLineup: any = [];
  positionMapping = {
    gk: [0, 5],
    rb: [4, 9],
    sw: [2, 5],
    rcb: [2, 8],
    lcb: [2, 2],
    lb: [4, 1],
    rw: [10, 9],
    rcmf: [7, 8],
    lcmf: [7, 2],
    lw: [10, 1],
    ss: [10, 5],
    cf: [12, 5],
    amf: [9, 5],
    rcmf3: [4, 8],
    dmf: [5, 5],
    lcmf3: [4, 2],
    rdmf: [5, 8],
    ldmf: [5, 2],
    ramf: [9, 8],
    lamf: [9, 2],
    rwf: [11, 9],
    lwf: [11, 1],
    rcb3: [0, 0],
    cb: [3, 5],
    lcb3: [0, 0],
    rwb: [5, 9],
    lwb: [5, 1],
    rb5: [0, 0],
    lb5: [0, 0],
  };

  constructor(private playersService: PlayersService) {
    this.net = [[...Array(11).keys()], [...Array(13).keys()]];
  }

  ngOnInit(): void {
    this.retrievePlayers();
  }

  retrievePlayers(): void {
    this.playersService.getAll().subscribe(
      (data) => {
        this.players = data;
        this.awayLineup = data.away_lineup;
        this.homeLineup = data.home_lineup;
        console.log(this.awayLineup);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkPosition(coords, lineup): string {
    // if (coords[0] === 1 && coords[1] === 0) return "Marcelo";

    var positionToCheck = Object.keys(this.positionMapping).find((key) => {
      if (typeof this.positionMapping[key] === "object") {
        if (
          this.positionMapping[key][0] == coords[0] &&
          this.positionMapping[key][1] == coords[1]
        )
          return true;
      }
    });

    /* if(positionToCheck) debugger */
    var player = this[lineup].find((player) => {
      if (positionToCheck && player.position === positionToCheck) return true;
    });

    var test = this[lineup].filter((player) => {
      if (!player.bench && !this.positionMapping[player.position]) return true;
    });

/*     console.log(test);

    return positionToCheck; */
    return player ? player.player_name : "";
  }
}
