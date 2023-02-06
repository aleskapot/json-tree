const { data } = require('./data.json');

// hashmap with index parent based index as key and array of entries objects as value
const entries = {}

data.forEach(entity => {
  // make hashmap key
  const key = (entity.parent === undefined) ? 'root' : `${entity.parent.type}-${entity.parent.id}`
  // store record to hashmap
  if (Array.isArray(entries[key])) {
    // if already has array - add a new element
    entries[key].push(entity)
  } else {
    // wrap with array if key not exists yet
    entries[key] = [entity]
  }
})

// recursively builds a hierarchy tree
function buildTree(node) {
  // key to search in hashmap
  const key = `${node.type}-${node.id}`
  if (Array.isArray(entries[key])) {
    // iterate through entries and build children via recursion
    node['children'] = entries[key].map(e => buildTree(e))
  }
  return node
}

const tree = buildTree(entries['root'][0])

console.log('TREE', tree)

/*
OUTPUT:

{
    "id": 1,
    "label": "Ride root",
    "type": "ride",
    "children": [{
            "id": 10,
            "label": "Ride inner",
            "type": "ride",
            "parent": {
                "id": 1,
                "type": "ride"
            },
            "children": [{
                    "id": 1,
                    "label": "Doc 1",
                    "type": "document",
                    "parent": {
                        "id": 10,
                        "type": "ride"
                    },
                    "children": [{
                            "id": 1,
                            "label": "towel red",
                            "type": "product",
                            "parent": {
                                "id": 1,
                                "type": "document"
                            }
                        }, {
                            "id": 2,
                            "label": "towel green",
                            "type": "product",
                            "parent": {
                                "id": 1,
                                "type": "document"
                            }
                        }
                    ]
                }, {
                    "id": 2,
                    "label": "Doc 2",
                    "type": "document",
                    "parent": {
                        "id": 10,
                        "type": "ride"
                    }
                }
            ]
        }
    ]
}

* */
