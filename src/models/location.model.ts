// Response Fields
// Field	Type	Unit	Description
// title	string		Name of the location
// location_type	string	(City|Region / State / Province|Country|Continent)
// latt_long	floats, comma separated
// woeid	integer		Where On Earth ID
// distance	integer	Metres	Only returned on a lattlong search
export interface ILocation {
    title: string;
    location_type: string;
    latt_long: string;
    woeid: number;
    distance?: number;
}

export class Location implements ILocation {
    constructor(public title: string, public location_type: string, public latt_long: string,
                public woeid: number, public distance?: number) {
        this.woeid = this.woeid || 0;
        this.distance = this.distance || 0;
    }

}
