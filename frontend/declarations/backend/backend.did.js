export const idlFactory = ({ IDL }) => {
  const Appointment = IDL.Record({
    'clientName' : IDL.Text,
    'date' : IDL.Text,
    'time' : IDL.Text,
    'purpose' : IDL.Text,
  });
  const Email = IDL.Record({
    'status' : IDL.Text,
    'sentTime' : IDL.Text,
    'subject' : IDL.Text,
    'recipient' : IDL.Text,
  });
  const Lead = IDL.Record({
    'status' : IDL.Text,
    'assignee' : IDL.Text,
    'name' : IDL.Text,
    'createdTime' : IDL.Text,
    'email' : IDL.Text,
  });
  const Proposal = IDL.Record({
    'status' : IDL.Text,
    'projectName' : IDL.Text,
    'value' : IDL.Float64,
    'clientName' : IDL.Text,
    'submissionDate' : IDL.Text,
  });
  return IDL.Service({
    'addLead' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'getAppointments' : IDL.Func([], [IDL.Vec(Appointment)], ['query']),
    'getCountryData' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Float64))],
        ['query'],
      ),
    'getEmailData' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Float64))],
        ['query'],
      ),
    'getEmails' : IDL.Func([], [IDL.Vec(Email)], ['query']),
    'getLeads' : IDL.Func([], [IDL.Vec(Lead)], ['query']),
    'getMetrics' : IDL.Func(
        [],
        [
          IDL.Record({
            'emails' : IDL.Nat,
            'newLeads' : IDL.Nat,
            'appointments' : IDL.Nat,
            'proposals' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getNewLeads' : IDL.Func([], [IDL.Vec(Lead)], ['query']),
    'getProposals' : IDL.Func([], [IDL.Vec(Proposal)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
