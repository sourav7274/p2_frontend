import SideBar from './components/Sidebar'
import { useSelector,useDispatch } from 'react-redux'
import { getAllLeads,getLeadById} from './features/leadSlice'
import { getSaleAgents } from './features/saleagentSlice'
import { getTags } from './features/tagSlice'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NewLead } from './components/NewLead'


export  const leadSource = ['Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other']
export  const leadStatuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed']
export  const priority = ['High', 'Medium', 'Low']


function App() {
  const dispatch = useDispatch()
  const {leads} = useSelector(state => state.leads)
  const [filterData,setFilter] = useState([])
  const [addLeadDIs,setAddLead] = useState(false)

  // console.log(tags)
  useEffect(() =>{
    dispatch(getAllLeads())
  },[])

  useEffect(() =>{
    dispatch(getSaleAgents())
  },[])

  useEffect(() =>{
    dispatch(getTags())
  },[])

  // console.log(saleAgent)

  const leadStatus = leads.reduce((acc,curr) =>{
    const status = curr.status
    acc[status] = (acc[status] || 0 )+1
    return acc
  } ,{New:0, Contacted:0 , Qualified:0})
  // console.log(leads)

  const handleFilter = (val) =>{
    const data = leads.filter((lead) => lead.status == val)

    setFilter(data)
  }

  return (
    <>
  <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen flex text-white">
    <SideBar />
    <div className="flex-1 p-6 bg-gray-800 rounded-lg shadow-md"> 
    <p className="text-3xl font-semibold text-gray-100">All Leads</p>
    <div className="grid grid-cols-4 gap-4 mt-5">
      {leads.map((lead) => (
        <div key={lead._id} className="col-span-1">
          <Link
            onClick={() => dispatch(getLeadById(lead._id))}
            to={`/leadManagement/${lead._id}`}
            className="block px-4 py-3 bg-gray-700 text-white text-center rounded-lg shadow-md transition hover:bg-indigo-500 hover:scale-105"
          >
            {lead.name}
          </Link>
        </div>
      ))}
    </div>
    <div className="flex gap-6 mt-9">
  {/* Left Sidebar (Lead Status + Filters) */}
  <div className="w-[320px] flex flex-col gap-6">
    <section className="p-5 bg-gray-800 rounded-lg shadow-md text-white">
      <p className="text-xl font-semibold border-b border-gray-700 pb-2">Lead Status</p>
      <ul className="mt-3 space-y-2">
        {["New", "Contacted", "Qualified"].map((status) => (
          <li key={status} className="flex justify-between px-4 py-2 bg-gray-700 rounded-md">
            <p className="text-sm">{status}</p>
            <span className="text-sm font-semibold bg-gray-600 px-3 py-1 rounded">
              {leadStatus[status]}
            </span>
          </li>
        ))}
      </ul>
    </section>

    <section className="p-5 bg-gray-800 rounded-lg shadow-md text-white">
      <p className="text-2xl font-semibold mb-3">Quick Filters</p>
      <div className="flex gap-3">
        {["New", "Contacted"].map((status) => (
          <button 
            key={status}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition"
            onClick={() => handleFilter(status)}
          >
            {status}
          </button>
        ))}
        <button 
          onClick={() => setFilter([])} 
          className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 text-white transition"
        >
          Reset
        </button>
      </div>
      {filterData.length > 0 && (
        <div className="mt-4 bg-gray-700 p-4 rounded-lg">
          {filterData.map((lead) => (
            <div key={lead.id} className="p-2 border-b border-gray-600 last:border-0">
              {lead.name}
            </div>
          ))}
        </div>
      )}
    </section>
  </div>

  {/* Right Side (Add New Lead) */}
  <div className="flex-1">
    <button className='bg-gray-700 px-4 py-3 rounded hover:bg-gray-500 w-l' onClick={() => setAddLead(!addLeadDIs)}>
      Add New Lead
    </button>
    
    {addLeadDIs && (
      <div className="mt-4 p-6 bg-gray-800 rounded-lg shadow-md">
        <NewLead />
      </div>
    )}
  </div>
</div>

     </div>
      </div>
    </>
  )
}

export default App
