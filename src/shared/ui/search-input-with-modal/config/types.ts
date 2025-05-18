export type FilterType = { code: string | null }

export type Agent = {
  svrCode: string | null,
  agentName: string | null,
  agentInn: string | null,
  agentKpp: string | null,
  gAgentKpp: string | null,
  agentPersAccount: string | null,
  bankAccNumber: string | null,
  persAccSection: string | null,
  bank: {
    bankBIK: { code: string | null },
    accountNumber: string | null,
  },
  agentKbkType: {
    code: string | null,
    name: string | null,
  },
  agentKbk: string | null,
  purpose: { code: string | null },
  receipt: { code: string | null },
}
