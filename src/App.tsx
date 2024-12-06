import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { useReadContract,useClient ,useTransactionCount, useWriteContract} from 'wagmi'
import abi from "./abis/abi.json"
function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { sendTransaction } = useSendTransaction()
  const { writeContract } = useWriteContract()

  const result = useReadContract({
    abi,
    address: '0x925af06C57A23D2Cc429349ACf9A0F7b88F72835',
    functionName: 'getEvent',
    args:[1]
  })
  console.log(result)
  const count = useTransactionCount({
    address: '0x2F55f5Aeb94A8b8E59E317D47754582bc16701fB',
  })
  console.log(count)
  const client = useClient()
console.log(client)


  return (
    <>
      <div>
        <h2>Account</h2>


        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      <button
      onClick={() =>
        sendTransaction({
          to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
          value: parseEther('0.00000001'),
        })
      }
    >
      Send transaction
    </button>
    <button
      onClick={() =>
        writeContract({
          abi,
          address: '0x925af06C57A23D2Cc429349ACf9A0F7b88F72835',
          functionName: 'createEvent',
          args: [
            "Blockchain Week",
            "New demo test",
            12,
            123
          ],
       })
      }
    >
      Register
    </button>


    </>
  )
}

export default App
