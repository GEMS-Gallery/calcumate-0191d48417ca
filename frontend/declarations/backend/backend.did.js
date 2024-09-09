export const idlFactory = ({ IDL }) => {
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
  });
};
export const init = ({ IDL }) => { return []; };
