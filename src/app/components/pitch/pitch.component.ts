import { Component, OnInit } from "@angular/core";

import { PlayersService } from "src/app/services/players.service";

@Component({
  selector: "app-pitch",
  templateUrl: "./pitch.component.html",
  styleUrls: ["./pitch.component.css"]
})
export class PitchComponent implements OnInit {
  net: any;
  players: any;
  awayLineup: any;
  homeLineup: any;
  positionMapping = {
    gk: [0, 0],
    rb: [0, 0],
    rcb: [0, 0],
    lcb: [0, 0],
    lb: [0, 0],
    rw: [0, 0],
    rcmf: [0, 0],
    lcmf: [0, 0],
    lw: [0, 0],
    ss: [0, 0],
    cf: [0, 0],
    amf: [0, 0],
    rcmf3: [0, 0],
    dmf: [0, 0],
    lcmf3: [0, 0],
    rdmf: [0, 0],
    ldmf: [0, 0],
    ramf: [0, 0],
    lamf: [0, 0],
    rwf: [0, 0],
    lwf: [0, 0],
    rcb3: [0, 0],
    cb: [0, 0],
    lcb3: [0, 0],
    rwb: [0, 0],
    lwb: [0, 0],
    rb5: [0, 0],
    lb5: [0, 0]
  };

  constructor(private playersService: PlayersService) {
    this.net = [[...Array(5).keys()], [...Array(5).keys()]];
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
    if (coords[0] === 1 && coords[1] === 0) return "Marcelo";
    return "";
  }
}
