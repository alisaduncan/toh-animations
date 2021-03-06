import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  animations: [
    trigger('animateIn', [
      transition('* => heroes-group', [
        style({transform: 'translateY(100%)'}),
        animate('0.5s')
      ]),
      transition('* => heroes-stagger', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(100%)'}),
          stagger('0.5s', [
            animate('0.5s', style({opacity: 1, transform: 'none'}))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  animateState = '';

  constructor(private heroService: HeroService, private route: ActivatedRoute) {
    this.animateState = route.snapshot.url[0].path;
   }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  public animationComplete(event: AnimationEvent) {
    alert('Animation complete!');
  }

}
