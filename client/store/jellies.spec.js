// import {expect} from 'chai'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import history from '../history'
// import {fetchCategories, fetchSingleJelly} from './jellies'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('jelly thunks/', () => {
//   let store
//   let mockAxios

//   const initialState = {jellies: {}}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('fetch single jelly', () => {
//     it('eventually dispatches the GET_SINGLE_JELLY action', async () => {
//       mockAxios.onGet('/api/jellies/3').replyOnce(200)
//       await store.dispatch(fetchSingleJelly(3))
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_SINGLE_JELLY')
//     })
//   })

//   describe('gets categories', () => {
//     it('gets all jelly categories', async () => {
//       mockAxios.onGet('/api/jellies/categories').replyOnce(200)
//       await store.dispatch(fetchCategories())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_CATEGORIES')
//       expect(history.location.pathname).to.be.equal('/')
//     })
//   })
// })
