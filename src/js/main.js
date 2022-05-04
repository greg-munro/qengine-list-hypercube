/* global enigma schema Filter include */ 
include('./filter.js')

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
