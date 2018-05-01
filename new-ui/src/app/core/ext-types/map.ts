export class Map<K extends string | number, V> {

  private array: Array<MapItem<K, V>>;

  constructor() {
    this.array = new Array<MapItem<K, V>>();
  }

  put(key: K, value: V) {
    let index = this.array.findIndex((item: MapItem<K, V>) => item.key === key);
    if (index !== -1) {
      this.array[index] = new MapItem(key, value);
    } else {
      this.array.push(new MapItem(key, value));
    }
  }

  get(key: K): V {
    let mapItem = this.array.find((item: MapItem<K, V>) => item.key === key);
    return mapItem == null ? null : mapItem.value;
  }

  containsKey(key: K): boolean {
    return this.array.findIndex(i => i.key === key) !== -1;
  }

  forEach(callbackfn: (key: K, value: V) => void): void {
    this.array.forEach((item: MapItem<K, V>) => callbackfn(item.key, item.value));
  }
}

class MapItem<K extends string | number, V> {

  constructor(
    public readonly key: K,
    public readonly value: V) { }
}