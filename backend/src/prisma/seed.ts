import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { phone: "0504108541" },
    update: {},
    create: {
      name: "HADASSAH",
      phone: "0504108541"
    }
  });

  const math = await prisma.category.upsert({
    where: { name: "Math" },
    update: {},
    create: { name: "Math" }
  });

  await prisma.subCategory.upsert({
    where: { name: "Algebra" },
    update: {},
    create: { name: "Algebra", category_id: math.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Geometry" },
    update: {},
    create: { name: "Geometry", category_id: math.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Calculus" },
    update: {},
    create: { name: "Calculus", category_id: math.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Statistics" },
    update: {},
    create: { name: "Statistics", category_id: math.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Trigonometry" },
    update: {},
    create: { name: "Trigonometry", category_id: math.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Probability" },
    update: {},
    create: { name: "Probability", category_id: math.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Arithmetic" },
    update: {},
    create: { name: "Arithmetic", category_id: math.id }
  });
  const science = await prisma.category.upsert({
    where: { name: "Science" },
    update: {},
    create: { name: "Science" }
  });

  await prisma.subCategory.upsert({
    where: { name: "Biology" },
    update: {},
    create: { name: "Biology", category_id: science.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Physics" },
    update: {},
    create: { name: "Physics", category_id: science.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Chemistry" },
    update: {},
    create: { name: "Chemistry", category_id: science.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Earth Science" },
    update: {},
    create: { name: "Earth Science", category_id: science.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Astronomy" },
    update: {},
    create: { name: "Astronomy", category_id: science.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Ecology" },
    update: {},
    create: { name: "Ecology", category_id: science.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Genetics" },
    update: {},
    create: { name: "Genetics", category_id: science.id }
  });
  const english = await prisma.category.upsert({
    where: { name: "English" },
    update: {},
    create: { name: "English" }
  });

  await prisma.subCategory.upsert({
    where: { name: "Grammar" },
    update: {},
    create: { name: "Grammar", category_id: english.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Vocabulary" },
    update: {},
    create: { name: "Vocabulary", category_id: english.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Reading Comprehension" },
    update: {},
    create: { name: "Reading Comprehension", category_id: english.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Writing Skills" },
    update: {},
    create: { name: "Writing Skills", category_id: english.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Speaking" },
    update: {},
    create: { name: "Speaking", category_id: english.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Listening" },
    update: {},
    create: { name: "Listening", category_id: english.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Punctuation" },
    update: {},
    create: { name: "Punctuation", category_id: english.id }
  });
  const geography = await prisma.category.upsert({
    where: { name: "Geography" },
    update: {},
    create: { name: "Geography" }
  });

  await prisma.subCategory.upsert({
    where: { name: "Maps" },
    update: {},
    create: { name: "Maps", category_id: geography.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Continents" },
    update: {},
    create: { name: "Continents", category_id: geography.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Countries" },
    update: {},
    create: { name: "Countries", category_id: geography.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Capitals" },
    update: {},
    create: { name: "Capitals", category_id: geography.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Climates" },
    update: {},
    create: { name: "Climates", category_id: geography.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Landforms" },
    update: {},
    create: { name: "Landforms", category_id: geography.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Oceans" },
    update: {},
    create: { name: "Oceans", category_id: geography.id }
  });
  const history = await prisma.category.upsert({
    where: { name: "History" },
    update: {},
    create: { name: "History" }
  });

  await prisma.subCategory.upsert({
    where: { name: "Ancient History" },
    update: {},
    create: { name: "Ancient History", category_id: history.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Medieval" },
    update: {},
    create: { name: "Medieval", category_id: history.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Modern" },
    update: {},
    create: { name: "Modern", category_id: history.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "World Wars" },
    update: {},
    create: { name: "World Wars", category_id: history.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Revolutions" },
    update: {},
    create: { name: "Revolutions", category_id: history.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Leaders" },
    update: {},
    create: { name: "Leaders", category_id: history.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Timelines" },
    update: {},
    create: { name: "Timelines", category_id: history.id }
  });
  const psychology = await prisma.category.upsert({
    where: { name: "Psychology" },
    update: {},
    create: { name: "Psychology" }
  });

  await prisma.subCategory.upsert({
    where: { name: "Cognitive" },
    update: {},
    create: { name: "Cognitive", category_id: psychology.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Behavioral" },
    update: {},
    create: { name: "Behavioral", category_id: psychology.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Developmental" },
    update: {},
    create: { name: "Developmental", category_id: psychology.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Social" },
    update: {},
    create: { name: "Social", category_id: psychology.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Clinical" },
    update: {},
    create: { name: "Clinical", category_id: psychology.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Personality" },
    update: {},
    create: { name: "Personality", category_id: psychology.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Neuroscience" },
    update: {},
    create: { name: "Neuroscience", category_id: psychology.id }
  });
  const technology = await prisma.category.upsert({
    where: { name: "Technology" },
    update: {},
    create: { name: "Technology" }
  });

  await prisma.subCategory.upsert({
    where: { name: "Computers" },
    update: {},
    create: { name: "Computers", category_id: technology.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "AI" },
    update: {},
    create: { name: "AI", category_id: technology.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Cybersecurity" },
    update: {},
    create: { name: "Cybersecurity", category_id: technology.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Networking" },
    update: {},
    create: { name: "Networking", category_id: technology.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Programming" },
    update: {},
    create: { name: "Programming", category_id: technology.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Databases" },
    update: {},
    create: { name: "Databases", category_id: technology.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Web Development" },
    update: {},
    create: { name: "Web Development", category_id: technology.id }
  });
  const art = await prisma.category.upsert({
    where: { name: "Art" },
    update: {},
    create: { name: "Art" }
  });

  await prisma.subCategory.upsert({
    where: { name: "Painting" },
    update: {},
    create: { name: "Painting", category_id: art.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Sculpture" },
    update: {},
    create: { name: "Sculpture", category_id: art.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Music" },
    update: {},
    create: { name: "Music", category_id: art.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Dance" },
    update: {},
    create: { name: "Dance", category_id: art.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Theater" },
    update: {},
    create: { name: "Theater", category_id: art.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Photography" },
    update: {},
    create: { name: "Photography", category_id: art.id }
  });
  await prisma.subCategory.upsert({
    where: { name: "Design" },
    update: {},
    create: { name: "Design", category_id: art.id }
  });
}

main()
  .then(() => {
    console.log('Seed completed');
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });