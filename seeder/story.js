
import { faker } from '@faker-js/faker';
export function createStory() {

    return {
        name: faker.word.words({ count: { min: 1, max: 5 } }),
        text: faker.word.words({ count: { min: 10, max: 111 } }),
        image: `https://picsum.photos/seed/${faker.string.uuid()}/300/300`,
        status: faker.number.int({ min: 0, max: 1 }),
        created_at: faker.date.past({ years: 5 }),
    }
}