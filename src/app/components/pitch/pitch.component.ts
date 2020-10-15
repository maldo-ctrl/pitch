import { Component, OnInit } from "@angular/core";

import { PlayersService } from "src/app/services/players.service";

@Component({
  selector: "app-pitch",
  templateUrl: "./pitch.component.html",
  styleUrls: ["./pitch.component.css"],
})
export class PitchComponent implements OnInit {
  showCoords: boolean = false;
  draggingHome: boolean = false;
  draggingAway: boolean = false;
  net: any;
  players: any;
  away: string;
  home: string;
  awayLineup: any = [];
  homeLineup: any = [];
  initialLineup: string = "";
  positionMapping = {
    gk: [0, 5],
    rb: [7, 9],
    sw: [5, 5],
    rcb: [5, 8],
    lcb: [5, 2],
    lb: [7, 1],
    rw: [13, 9],
    rcmf: [10, 8],
    lcmf: [10, 2],
    lw: [13, 1],
    ss: [13, 5],
    cf: [15, 5],
    amf: [12, 5],
    rcmf3: [7, 8],
    dmf: [8, 5],
    lcmf3: [7, 2],
    rdmf: [8, 8],
    ldmf: [8, 2],
    ramf: [12, 8],
    lamf: [12, 2],
    rwf: [14, 9],
    lwf: [14, 1],
    cb: [6, 5],
    rwb: [8, 9],
    lwb: [8, 1],
    /*     lcb3: [0, 0],
    rcb3: [0, 0],
    rb5: [0, 0],
    lb5: [0, 0], */
  };

  constructor(private playersService: PlayersService) {
    this.net = [[...Array(11).keys()], [...Array(16).keys()]];
  }

  ngOnInit(): void {
    this.retrievePlayers();
  }

  drag(event, coords, lineup): void {
    if (lineup == "homeLineup") {
      this.draggingHome = true;
    } else {
      this.draggingAway = true;
    }
    event.dataTransfer.setData("initialCoords", coords);
    event.dataTransfer.setData("initialLineup", lineup);
    this.initialLineup = lineup;
  }
  dragEnd(): void {
    this.draggingHome = false;
    this.draggingAway = false;
  }
  allowDrop(event, coords, lineup): void {
    if (this.getPosition(coords) && this.initialLineup == lineup) {
      event.preventDefault();
    }
  }

  drop(event, coords, lineup): void {
    var initialCoords = event.dataTransfer
      .getData("initialCoords")
      .split(",")
      .map((el) => Number(el));
    this.draggingHome = false;
    this.draggingAway = false;
    if (this.initialLineup == lineup)
      return this.swap(initialCoords, coords, lineup);
  }

  retrievePlayers(): void {
    this.playersService.getAll().subscribe(
      (data) => {
        this.players = data;
        this.away = data.away;
        this.home = data.home;
        this.awayLineup = data.away_lineup;
        this.homeLineup = data.home_lineup;
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

    return player ? player.player_name : "";
  }

  getPlayerIdFromCoords(coords, lineup): number {
    var pos = this.getPosition(coords);
    var player = this[lineup].find((p) => p.position == pos);
    if (player) return Number(player.player_id);
    else return -1;
  }

  swap(origin, destination, lineup): void {
    var currentLineup = this[lineup];

    var originPos = this.getPosition(origin);
    var destinationPos = this.getPosition(destination);

    var fromBench = originPos == "bench";
    var toBench = destinationPos == "bench";

    var originPlayer;

    if (fromBench) {
      originPlayer = currentLineup.find((p) => p.player_id == origin[1]);
    } else {
      originPlayer = currentLineup.find((p) => p.position == originPos);
    }

    var destinationPlayer;

    if (toBench) {
      destinationPlayer = currentLineup.find(
        (p) => p.player_id == destination[1]
      );
    } else {
      destinationPlayer = currentLineup.find(
        (p) => p.position == destinationPos
      );
    }

    if (fromBench) {
      if (toBench) {
        return;
      } else {
        if (!destinationPlayer) return;
        originPlayer.position = destinationPos;
        originPlayer.bench = false;
        destinationPlayer.position = null;
        destinationPlayer.bench = true;
      }
    } else {
      if (toBench) {
        originPlayer.position = null;
        originPlayer.bench = true;
        if (destinationPlayer) {
          destinationPlayer.position = originPos;
          destinationPlayer.bench = false;
        }
      } else {
        originPlayer.position = destinationPos;
        originPlayer.bench = false;
        if (destinationPlayer) {
          destinationPlayer.position = originPos;
          destinationPlayer.bench = false;
        }
      }
    }
  }

  getPlayers(lineup): any {
    return this[lineup].filter((el) => !el.bench);
  }

  getBench(lineup): any {
    return this[lineup].filter((el) => el.bench);
  }

  getPosition(coords): any {
    if (coords[0] == -1) return "bench";
    else
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
