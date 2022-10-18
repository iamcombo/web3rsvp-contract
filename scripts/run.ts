import { ethers, network } from 'hardhat';

const main = async () => {
  const rsvpContractFactory = await ethers.getContractFactory("Web3Rsvp");
  const rsvpContract = await rsvpContractFactory.deploy();
  await rsvpContract.deployed();
  console.log('====================================');
  console.log("Contract deploy to:", rsvpContract.address);
  console.log('====================================');

  // testing
  const [deployer, address1, address2] = await ethers.getSigners();

  let deposit = ethers.utils.parseEther("0.1");
  let maxCapacity = 3;
  let timestamp = 1718926200;
  let eventDataCID =
    "bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi";

  // create event
  let txn = await rsvpContract.createNewEvent(
    timestamp,
    maxCapacity,
    deposit,
    eventDataCID
  );

  let wait: any = await txn.wait();
  console.log(
    "NEW EVENT CREATED:", 
    wait.events[0].event, 
    wait.events[0].args
  );
  
  let eventID = wait.events[0].args.eventID;
  console.log("EVENT ID:", eventID);

  // rsvp to event
  txn = await rsvpContract.createNewRSVP(eventID, { value: deposit });
  wait = await txn.wait();
  console.log("NEW RSVP:", wait.events[0].event, wait.events[0].args);
  
  txn = await rsvpContract
    .connect(address1)
    .createNewRSVP(eventID, { value: deposit });
  wait = await txn.wait();
  console.log("NEW RSVP:", wait.events[0].event, wait.events[0].args);
  
  txn = await rsvpContract
    .connect(address2)
    .createNewRSVP(eventID, { value: deposit });
  wait = await txn.wait();
  console.log("NEW RSVP:", wait.events[0].event, wait.events[0].args);

  // confirm all attendee
  txn = await rsvpContract.confirmAllAttendees(eventID);
  wait = await txn.wait();
  wait.events.forEach((event: any) =>
    console.log("CONFIRMED:", event.args.attendeeAddress)
  );

  // wait 10 years
  await network.provider.send("evm_increaseTime", [15778800000000]);

  txn = await rsvpContract.withdrawUnclaimedDeposits(eventID);
  wait = await txn.wait();
  console.log("WITHDRAWN:", wait.events[0].event, wait.events[0].args);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();