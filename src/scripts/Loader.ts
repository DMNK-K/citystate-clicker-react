/**Class for loading gameplay data either from previous progress, or from Config */
class Loader
{
    static get saveExists(): boolean
    {
        if (localStorage.getItem("bld") === null) {return false;}
        if (localStorage.getItem("tech") === null) {return false;}
        if (localStorage.getItem("res") === null) {return false;}
        if (localStorage.getItem("happ") === null) {return false;}
        if (localStorage.getItem("pop") === null) {return false;}
        if (localStorage.getItem("ticks") === null) {return false;}
        return true;
    }

    // static load
}

export default Loader;