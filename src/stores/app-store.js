import { observable, computed, decorate, action } from 'mobx'; // observable, computed, action, decorate 

import {createFilter} from 'react-search-input'
import arrayLodash from 'lodash/array';
import collection from 'lodash/collection';

import DataParcer from '../services/data-parcer';
import api from '../services/Api';

const INIT_ROWS_PER_PAGE = 10;
const INIT_PAGE = 0;

const TYPES_URL = "https://pokeapi.co/api/v2/type/";

class Store {
  screenPokemons;
  pokemonsList;
  state;

  get exportPokemonsData() {
    const _filterByTerm = (list) => {
      return list.filter(createFilter(this.state.term, "name"))
    }
    const filtredPokimons = _filterByTerm(this.pokemonsList);
    return filtredPokimons;
  }

  get tagFilterEnabled() {
    return this.state.pokemonsList;
  }

  get currentTagsLists() {
    const result = this.state.selectedTags.map((it) => {
      return this.tagsStore[it];
    })
    return result ? result : [];
  }

  get displayList() {
    Promise.resolve(this.exportPokemonsData)
    .then((array) => {
      this.tableListLength(array.length);
    })
    return this._spliceToTablePage(this.exportPokemonsData);
  }

  get rowsCount() {
    return this.state.rowsPerPage;
  }

  get currentPage() {
    return this.state.currentPage;
  }

  get pokemonsLength() {
    return this.state.pokemonsCount;
  }

  get offset() {
    return this.state.currentPage * this.state.rowsPerPage;
  }

  tableListLength(count) {
    this.setState({pokemonsCount: count})
  }

  set searchTerm(newTerm) {
    this.setState({term: newTerm});
  }

  set page(count) {
    this.setState({currentPage: count});
  }

  pokemons(list) {
    this.pokemonsList = list.splice(0);
  }

  setTagsList(array) {
    this.tagsStore = array;
  }

  setState(state) {
    for (let property of Object.keys(state)) {
      this.state[property] = state[property];
    }
  }

  filterTags(tag) {
    const tags = this.state.selectedTags.slice();
    const newTagIndex = tags.indexOf(tag);
    if (newTagIndex === -1) {
       tags.push(tag);
    } else {
       tags.splice(newTagIndex, 1);
    }
    return tags;
 }

  constructor() {
    this.tagsList = [];
    this.pokemonsList = [];
    this.screenPokemons = [];
    this.state = {
      term: '',
      selectedTags: [],
      pokemonsTagsSelected: [],
      // orderBy: "name",
      // order: "asc",
      pokemonsCount: INIT_PAGE,
      pokemonsList: 'init',
      currentPage: INIT_PAGE, 
      rowsPerPage: INIT_ROWS_PER_PAGE,
    };
    this._init();
}

  _filterByTags(name) {
    const selectedTags = this.filterTags(name);
    this.setState({'selectedTags': selectedTags})
    if (selectedTags.length > 0) {
        const tagList = this.state.selectedTags.map((it) => {
          return this.tagsStore[it];
        });
        this.getPromiseList(tagList)
        .then(this.onTagsLists, this.onErrorList);
    } else {
      this.pokemons(this.screenPokemons.slice());
    }
  }

  onTagsLists(lists) {
      const pokemons = lists.map((list) => {
      return (list.map((response) => {
        return response.pokemon;
      }));
    });
    const filtredByTagsPokemons = this._comparePokemonsLists(pokemons);
    this.pokemons(filtredByTagsPokemons); 
  }

  onErrorList(error) {
    this.pokemons([]);
    console.log(error)
  }
  
  _setPokimonsByTags(tags) {
    const pokemonsLists = {};
    tags.forEach((tag) => {
      pokemonsLists[tag.name] = this._loadPokemonsWithTag(tag.url) 
   });
   this.setTagsList(pokemonsLists)
  }

  getPromiseList(arrayPromises) {
    return Promise.all(arrayPromises);
  }

  _comparePokemonsLists(pokemonsByTags) {
    if (pokemonsByTags.length > 1) {
      const count = pokemonsByTags.length;
      const sortedAllPokemons = collection.sortBy([].concat(...pokemonsByTags), [function (o) {return o.name}]); 
      let pokemons = arrayLodash.sortedUniqBy(arrayLodash.compact(sortedAllPokemons.map((item,_index,array) => {
        return array.filter((it) => {
          return it.name === item.name;
        }).length === count ? item : '';
      })), (o) => o.name);
      return pokemons;
    }
  return pokemonsByTags[0];
}

  loadPokemonData({name, url}) {
    return api.getPokemonData(url)
    .then((pokemonData) => {
      const currentPokemonData = {
        id: pokemonData.id,
        name: name,
        avatar: pokemonData.sprites.front_default,
        stats: pokemonData.stats,
        types: pokemonData.types,
        url: url
      }
      return DataParcer.parsePokemon(currentPokemonData);
    })
    .catch(e => {console.log(e)})
  }

  getPokemonData(item) {
    return this.loadPokemonData(item);
}

  _init() {
    this._loadTypesList()
    .then((response) => {
        this.tagsList = response.results;
        return response.results;
    })
    .then((tags) => {
       this._setPokimonsByTags(tags)
    });
    this._loadPokemonsList()
    .then(this._onSuccessPokemons, this._onErrorPokemons);
  }

  _onSuccessPokemons(response) {
    this.screenPokemons = Array.from(response.results).slice();
    this.pokemons(response.results);
    this.setState({pokemonsList: 'done'})
    this.tableListLength(response.results.length);
    return response.results;
  }

  _onErrorPokemons(error) {
    this.setState({pokemonsList: 'error'})
    console.log(error);
    return []
  }

  _spliceToTablePage(list) {
    return Array.from(list).slice(0).splice(this.offset, this.state.rowsPerPage);
  }

  _loadPokemonsWithTag(url) {
    return api.getTypePokemons(url)
    .then((response) => {
        return response.pokemon;
      })
  }

  _loadTypesList() {
    return api.getTypes(TYPES_URL)
    .catch((e) => {
      console.log(e);
    })
  }

  _loadPokemonsList() {
    return api.getPokemonsList()
  }

  _loadPokemonsData(list) {
    const pokemonsWithData = list.map((item, index) => {
      const storedData = this.storedPokemons.filter((stroredPokemon) => {return stroredPokemon.url === item.url});
      if (storedData.length === 1) {
        return storedData[0];
      }
      return this.loadPokemonData(item);
    })

    return Promise.all(pokemonsWithData); 
  }
}

decorate(Store, {
    pokemonsList: observable.ref,
    screenPokemons: observable.ref,
    state: observable,
    currentTagsLists: computed,
    displayList: computed,
    exportPokemonsData: computed,
    tagFilterEnabled: computed,
    rowsCount: computed,
    pokemonsLength: computed,
    currentPage: computed,
    offset: computed,
    setTagsList: action,
    setState: action,
    filterTags: action,
    tableListLength: action,
    _onSuccessPokemons: action.bound,
    _onErrorPokemons: action.bound,
    pokemons: action,
    onTagsLists: action.bound,
    onErrorList: action.bound
    // setSort: action,
    // sortPokemons: computed,
  });

const store = new Store();

export default store;
