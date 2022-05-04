/* global enigma schema Filter include */ 
class Filter {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)

    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.innerHTML = `<ul id='${this.elementId}_list'></ul>`
      this.options.model.on('changed', this.render.bind(this))
      this.render()
    }
    else {
      console.error(`no element found with id - ${this.elementId}`)
    }
  }

  handleClick (event) {
    if (event.target.classList.contains('list-item')) {
      const elemNumber = event.target.getAttribute('data-elem')
      this.options.model.selectListObjectValues('/qListObjectDef', [+elemNumber], true)
    }
  }

  render () {
    this.options.model.getLayout().then(layout => {
      console.log(layout)
      let html = layout.qListObject.qDataPages[0].qMatrix.map(row => 
        `<li data-elem="${row[0].qElemNumber}" class='list-item state-${row[0].qState}'>${row[0].qText} - ${row[0].qState}</li>`).join('')
      const el = document.getElementById(`${this.elementId}_list`)
      if (el) {
        el.innerHTML = html
      }
    })
  }
}


const session = enigma.create({
  schema, 
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/af650d53-f31b-476d-b28b-7db3bd2f620f'
})

session.open().then(global => {
  console.log(global)
  //   global.getDocList().then(response => {
  //     console.log(response)
  // })
  global.openDoc('af650d53-f31b-476d-b28b-7db3bd2f620f').then(app => {
    console.log(app)
    app.getField('Region Name').then(f => {
      console.log(f)
      f.selectValues([{ qText: 'Central' }]).then(response => {
        console.log(response)
      })
    })
    const def = {
      qInfo: {
        qType: 'blah'
      },
      qListObjectDef: {
        qDef: {
          qFieldDefs: ['Region Name'], 
          qSortCriterias: [ { qSortByState: 1, qSortByAscii: 1 } ] 
        },
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 1,
          qHeight: 6
        }]
      }
    }
    app.createSessionObject(def).then(model => {
      console.log(model)
      const f = new Filter('filter1', { model })
    })

    const def2 = {
      qInfo: {
        qType: 'blah'
      },
      qListObjectDef: {
        qDef: { qFieldDefs: ['Division Name'] },
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 1,
          qHeight: 6
        }]
      }
    }
    app.createSessionObject(def2).then(model => {
      console.log(model)
      const f = new Filter('filter2', { model })
    })
  })
})
