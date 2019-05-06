const STATS_SEQUENCE = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed', 'accuracy', 'evasion']
const TYPES_MAP = new Map([
    ["normal" , "Silver"], 
    ["fighting" , "YellowGreen"],
    ["flying" , "Fuchsia"],
    ["poison" , "Purple"],
    ["ground" , "Red"],
    ["rock" , "Maroon"],
    ["bug" , "Yellow"],
    ["ghost" , "Olive"],
    ["steel" , "Lime"],
    ["fire"  , "Green"],
    ["water"  , "Aqua"],
    ["grass"  , "Teal"],
    ["electric"  , "Blue"],
    ["psychic"  , "Navy"],
    ["ice"  , "Chocolate"],
    ["dragon"  , "DarkGoldenRod"],
    ["dark"  , "DarkSlateBlue"],
    ["fairy"  , "OrangeRed"],
    ["unknown" , "DarkSlateGray"],
    ["shadow" , "Gray"]
]);

class DataParser {
    constructor(data) {
      this.id = String(data.id) || 0;
      this.name = String(data.name) || '';
      STATS_SEQUENCE.forEach((stat) => {
        const dataStat = data.stats.find((it) => {
         return it.stat.name === stat;
      });
      this[stat] = dataStat ? dataStat[`base_stat`] : 0;
    });
      this.types = this.setTypes(data.types);
      this.avatar = String(data.avatar) || ''; 
    }

    setTypes(types) {
       return types.map((it, index) => {
         return {name: [it.type.name], color: TYPES_MAP.get(it.type.name) || `red`}
       })
    }
  
    static parsePokemon(data) {
      return new DataParser(data);
    }
  
    static parsePokemons(array) {
      const data = array.map((it) => {
        return DataParser.parsePokemon(it);
      }) || '';
      return data;
    };
  }
  
  export default DataParser;