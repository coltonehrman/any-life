export class Family {
  constructor({ id, name, description, creator } = {}) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.members = [];
    this.creator = creator;
  }

  addMember(member) {
    this.members.push(member);
  }

  removeMember(memberId) {
    this.members = this.members.filter((member) => member.id !== memberId);
  }
}
