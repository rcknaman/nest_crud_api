import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';



export class consumerMod{

    constructor(){}
    
    @MessagePattern('replace-emoji')
    replaceEmoji(@Payload() data: string, @Ctx() context: RmqContext): string {
      const { properties: { headers } } = context.getMessage();
      console.log("data:::",data);
      console.log(`Pattern: ${context.getPattern()}`);
      
      return headers['x-version'] === '1.0.0' ? '🐱' : '🐈';
    }
}
