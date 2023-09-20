import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from './../../Models/Pokemon';
import { CalcService } from '../calc.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-image',
  templateUrl: './my-image.component.html',
  styleUrls: ['./my-image.component.css']
})
// export class MyImageComponent implements OnInit
export class MyImageComponent {


  // local variable
  myNumStr: string = "";
  myNum: number = 0;

  private subscription: Subscription = new Subscription;


  public dummyPokemon: Pokemon = {
    name: 'pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  }

  thePokemons: string[] = ["pikachu", "mewtwo",  "charizard", "greninja", "jigglypuff", "lugia", "umbreon", "garchomp", "rayquaza", "gengar"];
  whichPokemon: string = "";


  constructor (private httpService: HttpService, private calc: CalcService) { }


  ngOnInit(): void {
    // Make callback function ASYNC
    this.subscription = this.calc.getMainNumStr().subscribe(async (nextValue:string) => {
      // IMPORTANT! Handle variable changes here

      this.myNumStr = nextValue;
      this.myNum = Math.abs(Math.trunc(parseFloat(this.myNumStr))) % 10;
      this.whichPokemon = this.thePokemons[this.myNum];

      this.dummyPokemon = await this.httpService.getPokemonObject(this.whichPokemon);
    });

  }

  // A Lifecycle Hook
  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
