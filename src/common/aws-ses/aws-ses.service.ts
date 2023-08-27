import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AwsSesService {
  private logger = new Logger(AwsSesService.name);
  private SesClient = new SESv2Client({
    region: 'us-east-1',
  });

  async sendEmail(config: {
    from: string;
    to: string;
    subject: string;
    body: string;
  }) {
    try {
      const command = new SendEmailCommand({
        FromEmailAddress: config.from,
        Destination: {
          ToAddresses: [config.to],
        },
        Content: {
          Simple: {
            Subject: {
              Data: config.subject,
            },
            Body: {
              Html: {
                Data: config.body,
              },
            },
          },
        },
      });

      const response = await this.SesClient.send(command);
      this.logger.debug(
        `AWS SES sending email response: ${JSON.stringify(response)}`,
      );

      return response;
    } catch (error) {
      this.logger.debug(
        `AWS SES sending email error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }
}
