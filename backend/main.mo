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

  public query func getMetrics() : async {
    newLeads: Nat;
    emails: Nat;
    proposals: Nat;
    appointments: Nat;
  } {
    {
      newLeads = 63;
      emails = 25;
      proposals = 49;
      appointments = 12;
    }
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