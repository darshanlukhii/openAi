import axios from 'axios';
import { Configuration, OpenAIAPI } from 'openai';

const configuration = new Configuration({
  apikey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIAPI(configuration);

const generateCompletion = async (input) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `You: ${input}\nAI:`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      stop: ['You:'],
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('OpenAI API request error:', error);
    throw error;
  }
};

export default generateCompletion;



// import TypeWriter from 'react-native-typewriter';
                    {/* <View style={[styles.balloon, {backgroundColor: 'grey'}]}>
                      {index === questionAnswerData.length - 1 ? (
                        <TypeWriter
                          typing={isTyping ? 1 : 0}
                          onTypingEnd={() => setIsTyping(false)}
                          style={styles.contentStyle}
                          maxDelay={10}>
                          {item?.content}
                        </TypeWriter>
                      ) : (
                        <Text style={styles.conStyle}>{item?.content}</Text>
                      )}
                    </View> */}