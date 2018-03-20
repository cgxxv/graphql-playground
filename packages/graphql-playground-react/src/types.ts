import { Observable, FetchResult } from 'apollo-link'
import { List, Map, Record } from 'immutable'

export type VariableToType = Map<string, any>

export interface SessionProps {
  id: string
  endpoint: string

  query: string
  file?: string
  variables: string
  responses?: List<ResponseRecord>
  operationName?: string
  queryRunning: boolean
  subscriptionActive: boolean

  // query facts
  operations: List<OperationDefinition>
  variableToType: VariableToType

  // additional props that are interactive in graphiql, these are not represented in graphiqls state
  queryTypes: QueryTypes
  date: Date
  hasMutation: boolean
  hasSubscription: boolean
  hasQuery: boolean

  isFile?: boolean
  starred?: boolean
  name?: string
  filePath?: string
  selectedUserToken?: string
  headers?: string
  hasChanged?: boolean
  absolutePath?: string
  isSettingsTab?: boolean
  isConfigTab?: boolean

  currentQueryStartTime?: Date
  currentQueryEndTime?: Date

  isReloadingSchema: boolean

  responseExtensions: any
  queryVariablesActive: boolean
  endpointUnreachable: boolean

  // editor settings
  editorFlex: number
  variableEditorOpen: boolean
  variableEditorHeight: number
  responseTracingOpen: boolean
  responseTracingHeight: number
  nextQueryStartTime?: Date
  tracingSupported?: boolean
  docExplorerWidth: number
  changed?: boolean
}

export interface QueryTypes {
  firstOperationName: string | null
  subscription: boolean
  query: boolean
  mutation: boolean
  permission?: boolean
  // operations: OperationDefinition[]
}

export interface OperationDefinition {
  startLine: number
  endLine: number
  name: string
}

export type ApolloLinkExecuteResponse = Observable<FetchResult>

export type HistoryFilter = 'HISTORY' | 'STARRED'

export type Environment = 'Node' | 'Browser' | 'Cli'
export type GraphQLClient =
  | 'fetch'
  | 'relay'
  | 'apollo'
  | 'graphql-request'
  | 'curl'

export type Theme = 'dark' | 'light'

export interface ISettings {
  ['general.betaUpdates']: boolean
  ['editor.theme']: Theme
  ['editor.reuseHeaders']: boolean
  ['tracing.hideTracingResponse']: boolean
}

export interface ResponseType {
  resultID: string
  date: string
  time: Date
}

export class ResponseRecord extends Record({
  resultID: '',
  date: '',
  time: new Date(),
}) {
  resultID: string
  date: string
  time: Date
}
