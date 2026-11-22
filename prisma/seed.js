


import { prisma } from "../src/db.js";

async function main() {
  // 1. Empty the tables, so running the seed twice doesn't create duplicates.
  //    Choices first, then scenes, then stories (children before parents).
  await prisma.choice.deleteMany();
  await prisma.scene.deleteMany();
  await prisma.story.deleteMany();

  // 2. Create the story. No start scene yet: the scenes don't exist!
  const story = await prisma.story.create({
    data: {
      title: "The Cellar",
      summary: "You wake up in a cold, dark cellar. Can you find your way out?",
    },
  });

  // 3. A small helper so we don't repeat storyId 8 times.
  async function addScene(title, body, isEnding = false) {
    return prisma.scene.create({
      data: { title, body, isEnding, storyId: story.id },
    });
  }

  const cellar  = await addScene("The cellar", "It is dark. The floor is cold and damp. Somewhere, water is dripping.");
  const light   = await addScene("A small flame", "The match flares. You see a wooden staircase and an old chest.");
  const wall    = await addScene("The wall", "Your fingers run along rough stone. One brick feels loose.");
  const chest   = await addScene("The chest", "Inside the chest: an old lantern, still working.");
  const stairs  = await addScene("The stairs", "At the top of the stairs there is a wooden trapdoor.");
  const passage = await addScene("A narrow passage", "Behind the brick, a tunnel too small to stand in.");
  const garden  = await addScene("The garden", "You push the trapdoor open. Fresh air, moonlight. You are free.", true);
  const lost    = await addScene("Lost", "The tunnel twists and splits. You never find the way back.", true);

  // 4. The choices = the arrows between scenes.
  await prisma.choice.createMany({
    data: [
      { label: "Light a match",                         fromSceneId: cellar.id,  toSceneId: light.id },
      { label: "Feel along the wall",                   fromSceneId: cellar.id,  toSceneId: wall.id },
      { label: "Open the old chest",                    fromSceneId: light.id,   toSceneId: chest.id },
      { label: "Climb the stairs",                      fromSceneId: light.id,   toSceneId: stairs.id },
      { label: "Push the loose brick",                  fromSceneId: wall.id,    toSceneId: passage.id },
      { label: "Go back to the middle of the room",     fromSceneId: wall.id,    toSceneId: cellar.id },
      { label: "Take the lantern and climb the stairs", fromSceneId: chest.id,   toSceneId: stairs.id },
      { label: "Push open the trapdoor",                fromSceneId: stairs.id,  toSceneId: garden.id },
      { label: "Crawl deeper",                          fromSceneId: passage.id, toSceneId: lost.id },
      { label: "Turn back",                             fromSceneId: passage.id, toSceneId: wall.id },
    ],
  });

  // 5. NOW the scenes exist, so we can set the start scene (the chicken-and-egg!).
  await prisma.story.update({
    where: { id: story.id },
    data: { startSceneId: cellar.id, published: true },
  });

  console.log(`Seeded "${story.title}" with 8 scenes and 10 choices.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;   // tell npm the seed failed
  })
  .finally(() => prisma.$disconnect());  // close the database connection
