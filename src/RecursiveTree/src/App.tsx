import React, { FC, useState } from 'react'
import { useRecoilSnapshot, useRecoilState } from 'recoil'
import { fakeState } from '../../fakeState'
import RecursiveTree from './components/recursive_tree'
import { mockOrgTreeList } from './data'
import { TreeBranch } from './types/types'

const onSelect = (value: TreeBranch) => {
  // You can put whatever here
}

function App() {
  const fake = useRecoilState(fakeState)
  const snapshot = useRecoilSnapshot()

  snapshot.retain()

  const list = Array.from(snapshot.getNodes_UNSTABLE())
  return (
    <>
      {list.map((item) => {
        const node = item
        const param = node.key.split(`__`)[1]
        const { contents } = snapshot.getLoadable(node)
        const data = contents instanceof Set ? Array.from(contents) : contents
        console.log({ contents })

        return <StateItem node={node} snapshot={snapshot} />
      })}
    </>
  )
}

const StateItem: FC<{ snapshot: any; node: any }> = ({ snapshot, node }) => {
  const { contents } = snapshot.getLoadable(node)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div style={{ padding: '5px' }}>
      <p onClick={() => setIsOpen(!isOpen)}>{node.key}</p>
      {isOpen && (
        <RecursiveTree
          key={node.key}
          listMeta={[contents]}
          onSelectCallback={onSelect}
        />
      )}
    </div>
  )
}

export default App
