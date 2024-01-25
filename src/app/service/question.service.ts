import { Injectable } from '@angular/core';

const RANKS = [
  { img: 'assets/img/0_kreivis_jaunesnysis_eilinis.png',  title: 'Jaunesnysis eilinis .Kareiviai.' },
  { img: 'assets/img/1_kareivis_eilinis.png',  title: 'Eilinis .Kareiviai.' },
  { img: 'assets/img/2_kareivis_vyresnysis_eilinis.png',  title: 'Vyresnysis eilinis .Kareiviai.' },
  { img: 'assets/img/3_puskarininkiai_grandinis.png',  title: 'Grandinis .Puskarininkiai.' },
  { img: 'assets/img/4_puskarininkai_serzantas_specialistas.png',  title: 'Seržantas specialistas .Puskarininkiai.' },
  { img: 'assets/img/5_puskarininkai_serzantas.png',  title:'Seržantas .Puskarininkiai.' },
  { img: 'assets/img/6_puskarininkai_vyresnysis_serzantas_specialistas.png',  title:'Vyresnysis seržantas specialistas .Puskarininkiai.' },
  { img: 'assets/img/7_puskarininkai_vyresnysis_serzantas.png',  title: 'Vyresnysis seržantas .Puskarininkiai. ' },
  { img: 'assets/img/8_puskarininkai_stabo_serzantas_specialistas.svg.png',  title: 'Štabo seržantas specialistas .Puskarininkiai.' },
  { img: 'assets/img/9_puskarininkai_stabo_serzantas.png', title: 'Štabo seržantas .Puskarininkiai.' },
  { img: 'assets/img/10_puskarininkai_viršila.png', title: 'Viršila .Puskarininkiai.' },
  { img: 'assets/img/11_puskarininkai_serzantas_majoras.png', title: 'Seržantas majoras .Puskarininkiai.' },
  { img: 'assets/img/12_jaunesnieji_karininkai_leitenantas.png', title: 'Leitenantas .Jaunesnieji karininkai.' },
  { img: 'assets/img/13_jaunesnieji_karininkai_vyresnysis_leitenantas.png', title: 'Vyresnysis leitenantas .Jaunesnieji karininkai.' },
  { img: 'assets/img/14_jaunesnieji_karininkai_kapitonas.png', title: 'Kapitonas .Jaunesnieji karininkai.' },
  { img: 'assets/img/15_vyresnieji_karininkai_majoras.png', title: 'Majoras .Vyresnieji karininkai.' },
  { img: 'assets/img/16_vyresnieji_karininkai_pulkininkas_leitenantas.png', title: 'Pulkininkas leitenantas .Vyresnieji karininkai.' },
  { img: 'assets/img/17_vyresnieji_karininkai_pulkininkas.png', title: 'Pulkininkas .Vyresnieji karininkai.' },
  { img: 'assets/img/18_generolas_brigados_generolas.png', title: 'Brigados generolas .Generolai.' },
  { img: 'assets/img/19_generolas_generolas_majoras.png', title: 'Generolas majoras .Generolai.' },
  { img: 'assets/img/20_generolas_generolas_leitenantas.png', title: 'Generolas leitenantas .Generolai.' },
  { img: 'assets/img/21_generolas.png', title: 'Generolas .Generolai.' }
];

export const NUM_RANKS : number = RANKS.length;

export interface IOption {
  title: string;
  img: string;
  correct?: boolean;
}

export interface IQuestion {
  title: string;
  img: string;
  options: IOption[];
}

@Injectable({
  providedIn: 'root'
})

export class QuestionService {
  constructor() { }

  private randInt(max: number) : number {
    return Math.floor(Math.random() * max);
  }

  private shuffle<T>(array: T[]) : T[] {
    let currentIndex = array.length;

    while (currentIndex > 0) {
      let randomIndex = this.randInt(currentIndex);
      --currentIndex;

      [array[randomIndex], array[currentIndex]] = [array[currentIndex], array[randomIndex]];
    }

    return array;
  }

  getQuestions(numOptions: number) : IQuestion[] {
    numOptions = Math.max(1, Math.min(numOptions, RANKS.length));

    let me = this;
    let q : IQuestion[] = [];

    RANKS.forEach(function(r) {
      let optionsSet = new Set<{title: string, img: string}>();

      optionsSet.add(r);
      while (optionsSet.size < numOptions)
        optionsSet.add(RANKS[me.randInt(RANKS.length)]);

      q.push({ title: r.title, img: r.img, options: me.shuffle([...optionsSet!].map(x => ({ title: x.title, img: x.img, ...(x.title===r.title && { correct: true } )}))) });
    });

    return this.shuffle(q);
  }
}
