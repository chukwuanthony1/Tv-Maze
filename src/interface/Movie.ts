export interface IMovie {
  id: string;
  url: string;
  name: string;
  season: string;
  show: IShow;
  airdate: string;
  runtime: number;
  rating: IRating;
  image: string;
  summary: string;
}

export interface IShow {
  id: string;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  image: { medium: string; original: string };
  summary: string;
  rating: IRating;
  network: INetwork;
  officialSite: string;
  premiered: string;
  schedule: ISchedule;
  weight: number;
  updated: number;
}

interface IRating {
  average: string;
}

interface INetwork {
  id: string;
  name: string;
  officialSite: string;
  country: ICountry
}

interface ICountry {

        name: string;
        code: string;
        timeZone: string;
}

interface ISchedule {
  time: string;
  days: string[];
}

export interface ICharacter {
  character: {
    id: string;
    url: string;
    name: string;
    image: { medium: string; original: string };
  };

  person: {
    name: string;
    birthday: string;
    gender: string;
    url: string;
    country : ICountry
    image: { medium: string; original: string };
    updated: string;
    deathday: string;
  };
  self: boolean;
  voice: boolean;
}
