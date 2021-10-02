class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampire = 0;
    let thisVampire = this;

    while (thisVampire.creator) {
      thisVampire = thisVampire.creator;
      numberOfVampire ++;
    }

    return numberOfVampire;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    } else {
      return false;
    }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let seniorityGap = this.numberOfVampiresFromOriginal - vampire.numberOfVampiresFromOriginal;
    let thisVampire = this;

    if (seniorityGap > 0) {
      while (seniorityGap > 0) {
        thisVampire = thisVampire.creator;
        seniorityGap--;
      }
    } else if (seniorityGap < 0) {
      while (seniorityGap < 0) {
        vampire = vampire.creator;
        seniorityGap++;
      }
    }

    if (thisVampire === vampire) {
      return thisVampire;
    }
    
    while (thisVampire.creator) {
      if (thisVampire.creator === vampire.creator) {
        return thisVampire.creator;
      } else {
        thisVampire = thisVampire.creator;
        vampire = vampire.creator;
      }

    }
  }
}

module.exports = Vampire;

