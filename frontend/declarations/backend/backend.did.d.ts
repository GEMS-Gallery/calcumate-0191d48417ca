import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Lead {
  'status' : string,
  'assignee' : string,
  'name' : string,
  'createdTime' : string,
  'email' : string,
}
export interface _SERVICE {
  'addLead' : ActorMethod<[string, string, string, string, string], undefined>,
  'getCountryData' : ActorMethod<[], Array<[string, number]>>,
  'getEmailData' : ActorMethod<[], Array<[string, number]>>,
  'getLeads' : ActorMethod<[], Array<Lead>>,
  'getMetrics' : ActorMethod<
    [],
    {
      'emails' : bigint,
      'newLeads' : bigint,
      'appointments' : bigint,
      'proposals' : bigint,
    }
  >,
  'getNewLeads' : ActorMethod<[], Array<Lead>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
