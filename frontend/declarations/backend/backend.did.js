export const idlFactory = ({ IDL }) => {
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
  return IDL.Service({
    'addLead' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
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
  });
};
export const init = ({ IDL }) => { return []; };
