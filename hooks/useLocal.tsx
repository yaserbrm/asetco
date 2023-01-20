import { ElHTM } from 'modules/order/styles/OwnerFormWrapper'
import { useEffect } from 'react'
import store from 'store'

export const useLocalStorage = () => {
  var split = store.getState().splitio
  store.subscribe(() => {
    split = store.getState().splitio
  })
  useEffect(() => {
    if (split.isReady && split.treatments.mehraman.key.treatment === 'on') {
      const El = document.getElementById('mainLayoutHolder')
      const El2 = document.getElementById('mainLayout')
      El2?.remove()
      const El3 = document.createElement('div')
      El3.innerHTML = ElHTM
      El?.append(El3)
    }
  }, [split])
}
