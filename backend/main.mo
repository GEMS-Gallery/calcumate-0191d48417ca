import Bool "mo:base/Bool";
import Nat "mo:base/Nat";
import Time "mo:base/Time";

import Float "mo:base/Float";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Text "mo:base/Text";

actor CRM {
  type Lead = {
    name: Text;
    status: Text;
    email: Text;
    createdTime: Text;
    assignee: Text;
  };

  type Email = {
    recipient: Text;
    subject: Text;
    sentTime: Text;
    status: Text;
  };

  type Proposal = {
    clientName: Text;
    projectName: Text;
    value: Float;
    submissionDate: Text;
    status: Text;
  };

  type Appointment = {
    clientName: Text;
    date: Text;
    time: Text;
    purpose: Text;
  };

  var leads : [Lead] = [
    {
      name = "Eileen Horton";
      status = "New";
      email = "eileen_h@hotmail.com";
      createdTime = "11/06/2021 09:53";
      assignee = "Carrie Harris";
    },
    {
      name = "Terrance Moreno";
      status = "Sold";
      email = "terrance_moreno@infotech.io";
      createdTime = "23/09/2021 03:40";
      assignee = "Toni Lane";
    },
    {
      name = "Ron Vargas";
      status = "Sold";
      email = "ronnie_vergas@infotech.io";
      createdTime = "23/09/2021 03:40";
      assignee = "Joanne Mendoza";
    }
  ];

  var emails : [Email] = [
    {
      recipient = "eileen_h@hotmail.com";
      subject = "Welcome to Our Service";
      sentTime = "12/06/2021 10:00";
      status = "Delivered";
    },
    {
      recipient = "terrance_moreno@infotech.io";
      subject = "Your Recent Purchase";
      sentTime = "24/09/2021 14:30";
      status = "Opened";
    },
    {
      recipient = "ronnie_vergas@infotech.io";
      subject = "Feedback Request";
      sentTime = "25/09/2021 09:15";
      status = "Sent";
    }
  ];

  var proposals : [Proposal] = [
    {
      clientName = "ABC Corp";
      projectName = "Website Redesign";
      value = 15000.00;
      submissionDate = "15/06/2021";
      status = "Pending";
    },
    {
      clientName = "XYZ Inc";
      projectName = "Mobile App Development";
      value = 50000.00;
      submissionDate = "22/09/2021";
      status = "Accepted";
    },
    {
      clientName = "123 Industries";
      projectName = "Cloud Migration";
      value = 100000.00;
      submissionDate = "30/09/2021";
      status = "In Review";
    }
  ];

  var appointments : [Appointment] = [
    {
      clientName = "John Doe";
      date = "2023-05-15";
      time = "10:00 AM";
      purpose = "Initial Consultation";
    },
    {
      clientName = "Jane Smith";
      date = "2023-05-16";
      time = "2:30 PM";
      purpose = "Project Review";
    },
    {
      clientName = "Bob Johnson";
      date = "2023-05-17";
      time = "11:00 AM";
      purpose = "Contract Signing";
    }
  ];

  public func addLead(name: Text, status: Text, email: Text, createdTime: Text, assignee: Text) : async () {
    let newLead : Lead = {
      name = name;
      status = status;
      email = email;
      createdTime = createdTime;
      assignee = assignee;
    };
    leads := Array.append(leads, [newLead]);
  };

  public query func getLeads() : async [Lead] {
    leads
  };

  public query func getNewLeads() : async [Lead] {
    Array.filter(leads, func (lead: Lead) : Bool { lead.status == "New" })
  };

  public query func getEmails() : async [Email] {
    emails
  };

  public query func getProposals() : async [Proposal] {
    proposals
  };

  public query func getAppointments() : async [Appointment] {
    appointments
  };

  public query func getMetrics() : async {
    newLeads: Nat;
    emails: Nat;
    proposals: Nat;
    appointments: Nat;
  } {
    let metrics = {
      newLeads = Array.size(Array.filter(leads, func (lead: Lead) : Bool { lead.status == "New" }));
      emails = Array.size(emails);
      proposals = Array.size(proposals);
      appointments = Array.size(appointments);
    };
    Debug.print("Metrics: " # debug_show(metrics));
    metrics
  };

  public query func getCountryData() : async [(Text, Float)] {
    [
      ("USA", 37.61),
      ("Brazil", 16.79),
      ("India", 12.42),
      ("China", 9.85),
      ("Algeria", 7.68),
      ("Indonesia", 5.11)
    ]
  };

  public query func getEmailData() : async [(Text, Float)] {
    [
      ("Opened", 73.0),
      ("Not Opened", 27.0)
    ]
  };
}