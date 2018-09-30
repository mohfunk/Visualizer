class SoundLib 
{
    num: number;
    curr: number;
    loaded: number;
    path: string;
    songs: object[];
    constructor(n: number, p: string) {
        this.num = n;
        this.curr = 0;
        this.loaded = 0;
        this.path = p;
        this.songs = [];
    }
    load(album: string, soundtrack: string) {
        }
    }
}
