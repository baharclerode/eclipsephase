/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class EclipsePhaseActor extends Actor {

  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (actorData.type === 'character') this._prepareCharacterData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    const data = actorData.data;

    for (let [key, aptitude] of Object.entries(data.aptitudes)) {
        aptitude.mod = aptitude.value * 3;
    }
    for (let [key, skill] of Object.entries(data.skillsIns)) {
      if(key === 'program' || key === 'interface' || key === 'infosec' ){
        skill.derived = skill.value + data.aptitudes.cog.value;
      }
      else {
        skill.derived = skill.value + data.aptitudes.int.value;
      }
    }
    for (let [key, skill] of Object.entries(data.skillsMox)) {
      if(key === 'provoke' || key === 'persuade' || key === 'kinesics' || key === 'deceive' ){
        skill.derived = skill.value + data.aptitudes.sav.value;
      }
      else {
        skill.derived = skill.value + data.aptitudes.wil.value;
      }
    }
    for (let [key, skill] of Object.entries(data.skillsVig)) {
      if(key === 'athletics' || key === 'free fall' || key === 'melee' ){
        skill.derived = skill.value + data.aptitudes.som.value;
      }
      else {
        skill.derived = skill.value + data.aptitudes.ref.value;
      }
    }
  }
}