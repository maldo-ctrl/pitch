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
  initialLineup: string = "";
  awayBench: any = [];
  homeBench: any = [];
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

  drag(event, coords, lineup, test): void {
    debugger
    event.dataTransfer.setData("initialCoords", coords);
    event.dataTransfer.setData("initialLineup", lineup);
    this.initialLineup = lineup;
  }
  allowDrop(event, coords, lineup): void {
    if (this.getPosition(coords) && this.initialLineup == lineup)
      event.preventDefault();
  }
  drop(event, coords, lineup): void {
    var initialCoords = event.dataTransfer
      .getData("initialCoords")
      .split(",")
      .map((el) => Number(el));
    if (this.initialLineup == lineup)
      return this.swap(initialCoords, coords, lineup);
  }

  retrievePlayers(): void {
    this.playersService.getAll().subscribe(
      (data) => {
        this.players = data;
        this.away = data.away;
        this.home = data.home;
        this.awayLineup = data.away_lineup.filter((el) => !el.bench);
        this.awayBench = data.away_lineup.filter((el) => el.bench);
        this.homeLineup = data.home_lineup.filter((el) => !el.bench);
        this.homeBench = data.home_lineup.filter((el) => el.bench);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkPosition(coords, lineup): string {
    var positionToCheck = Object.keys(this.positionMapping).find((key) => {
      if (typeof this.positionMapping[key] === "object") {
        if (
          this.positionMapping[key][0] == coords[0] &&
          this.positionMapping[key][1] == coords[1]
        )
          return true;
      }
    });

    var player = this[lineup].find((player) => {
      if (positionToCheck && player.position === positionToCheck) return true;
    });

    /*     console.log(test);

    return positionToCheck; */
    return player ? player.player_name : "";
  }

  getPlayerIdFromCoords(coords, lineup): number {
    var pos = this.getPosition(coords);
    var player = this[lineup].find((p) => p.position == pos);
    if (player) return Number(player.player_id);
    else return -1;
  }

  swap(origin, destination, lineup): void {
    console.log(origin, destination);
    var originPos = this.getPosition(origin);
    var destinationPos = this.getPosition(destination);
    var originPlayer = this[lineup].find((p) => p.position == originPos);
    var destinationPlayer = this[lineup].find(
      (p) => p.position == destinationPos
    );
    originPlayer.position = destinationPos;
    if (destinationPlayer) {
      destinationPlayer.position = originPos;
    }
  }

  getPosition(coords): any {
    return Object.keys(this.positionMapping).find((key) => {
      if (typeof this.positionMapping[key] === "object") {
        if (
          this.positionMapping[key][0] == coords[0] &&
          this.positionMapping[key][1] == coords[1]
        )
          return true;
      }
    });
  }
}
