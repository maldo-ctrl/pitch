import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { PitchComponent } from "./components/pitch/pitch.component";
import { PlayerComponent } from "./components/player/player.component";

@NgModule({
  declarations: [AppComponent, PitchComponent, PlayerComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
