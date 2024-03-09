this.selectDescriptor = {
 subword: 'model-item',
 values: Object.keys(archive),
 value_attr: 'word',
 select_attr: 'selected',
 get: () => word,
 set: value => { $word(value); DO['open model'](word) }
}