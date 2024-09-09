import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Appointment {
  'clientName' : string,
  'date' : string,
  'time' : string,
  'purpose' : string,
}
export interface Email {
  'status' : string,
  'sentTime' : string,
  'subject' : string,
  'recipient' : string,
}
export interface Lead {
  'status' : string,
  'assignee' : string,
  'name' : string,
  'createdTime' : string,
  'email' : string,
}
export interface Proposal {
  'status' : string,
  'projectName' : string,
  'value' : number,
  'clientName' : string,
  'submissionDate' : string,
}
export interface _SERVICE {
  'addLead' : ActorMethod<[string, string, string, string, string], undefined>,
  'getAppointments' : ActorMethod<[], Array<Appointment>>,
  'getCountryData' : ActorMethod<[], Array<[string, number]>>,
  'getEmailData' : ActorMethod<[], Array<[string, number]>>,
  'getEmails' : ActorMethod<[], Array<Email>>,
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
  'getProposals' : ActorMethod<[], Array<Proposal>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
