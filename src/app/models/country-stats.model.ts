    export interface CountryInfo {
        iso2: string;
        iso3: string;
        _id: any;
        lat: number;
        long: number;
        flag: string;
    }

    export class CountryStats {
        country: string;
        countryInfo: CountryInfo;
        cases: number;
        todayCases: number;
        deaths: number;
        todayDeaths: number;
        recovered: number;
        active: number;
        critical: number;
        casesPerOneMillion: number;
        deathsPerOneMillion: number;
    }
